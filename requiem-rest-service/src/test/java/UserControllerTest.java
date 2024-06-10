import com.example.requiemrestservice.controller.UserController;
import com.example.requiemrestservice.model.Follow;
import com.example.requiemrestservice.model.MyUser;
import com.example.requiemrestservice.model.Stream;
import com.example.requiemrestservice.service.FollowService;
import com.example.requiemrestservice.service.MyUserService;
import com.example.requiemrestservice.service.StreamService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MyUserService myUserService;

    @MockBean
    private StreamService streamService;

    @MockBean
    private FollowService followService;

    private MyUser user;
    private Stream stream;
    private Follow follow;

    @BeforeEach
    public void setUp() {
        user = new MyUser();
        user.setId(1);
        user.setUsername("testuser");
        user.setEmail("testuser@example.com");
        user.setAvatar("avatar.png");
        user.setInfo("Info about user");
        user.setRole("USER");
        user.setCreatedAt(Timestamp.valueOf("2023-01-01 00:00:00").toLocalDateTime());
        user.setUpdatedAt(Timestamp.valueOf("2023-01-01 00:00:00").toLocalDateTime());

        stream = new Stream();
        stream.setId(1);
        stream.setUser(user);
        stream.setLive(true);
        stream.setViewersCount(100);

        follow = new Follow();
        follow.setId(1);
        follow.setOwner(user);
    }

    @Test
    public void testGetProfile() throws Exception {
        when(myUserService.getByUsername("testuser")).thenReturn(user);
        when(streamService.getAll()).thenReturn(Collections.singletonList(stream));
        when(followService.getAll()).thenReturn(Collections.singletonList(follow));

        mockMvc.perform(MockMvcRequestBuilders.get("/user/profile/testuser"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("testuser"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.live").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$.viewersCount").value(100))
                .andExpect(MockMvcResultMatchers.jsonPath("$.followersCount").value(1));
    }

    @Test
    public void testGetRecommended() throws Exception {
        when(myUserService.getById(1)).thenReturn(Optional.of(user));
        when(myUserService.getAll()).thenReturn(Collections.singletonList(user));
        when(followService.getAll()).thenReturn(Collections.singletonList(follow));
        when(streamService.getAll()).thenReturn(Collections.singletonList(stream));

        mockMvc.perform(MockMvcRequestBuilders.get("/user/recommended/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testTestEndpoint() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/user/test"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Hello, ALL DONE"));
    }
}
