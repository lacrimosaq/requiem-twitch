package com.example.requiemrestservice.controller;

import com.example.requiemrestservice.model.MyUser;
import com.example.requiemrestservice.service.MyUserService;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Objects;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private MyUserService myUserService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Value("${security.jwt.secret-key}")
    private String jwtSecretKey;

    @Value("${security.jwt.issuer}")
    private String jwtIssuer;

    private String createJwtToken(MyUser myUser){
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(jwtIssuer)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(3600*24))
                .subject(myUser.getUsername())
                .claim("role", myUser.getRole())
                .build();
        var encoder = new NimbusJwtEncoder(
                new ImmutableSecret<>(jwtSecretKey.getBytes())
        );
        var params = JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS256).build(), claims
        );
        return encoder.encode(params).getTokenValue();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody MyUser model) {
        MyUser checkUsername = myUserService.getByUsername(model.getUsername());
        MyUser checkEmail = myUserService.getByEmail(model.getEmail());
        if(checkUsername == null && checkEmail == null)
        {
            var BCryptEncoder = new BCryptPasswordEncoder();
            MyUser user = new MyUser();
            user.setUsername(model.getUsername());
            user.setEmail(model.getEmail());
            user.setPassword(BCryptEncoder.encode(model.getPassword()));
            user.setRole("client");

            try {
                myUserService.save(user);

                String jwtToken = createJwtToken(user);
                var response = new HashMap<String, Object>();
                response.put("token", jwtToken);
                response.put("user", user);

                return ResponseEntity.ok(response);
            }
            catch(Exception ex){
                return ResponseEntity.badRequest().body("Exception: " + ex.getMessage());  //getStackTrace()
            }
        }
        return ResponseEntity.badRequest().body("This username or email has already used!");
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MyUser model) {
            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                model.getUsername(),
                                model.getPassword()
                        )
                );

                MyUser user = myUserService.getByUsername(model.getUsername());
                String jwtToken = createJwtToken(user);
                var response = new HashMap<String, Object>();
                response.put("token", jwtToken);
                response.put("user", user);

                return ResponseEntity.ok(response);
            } catch (Exception ex) {
                return ResponseEntity.badRequest().body("Username or password is not correct!");
            }

    }
}
