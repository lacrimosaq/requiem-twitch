"use client"
import { redirect } from "next/navigation";
import { DashboardNavbar } from "./_components/DashboardNavbar/dashboard-navbar";
import { useEffect, useState } from "react";
import { Sidebar } from "./_components/Sidebar/sidebar";
import { Container } from "./_components/container";

interface DashboardLayoutProps {
    params: {username: string};
    children: React.ReactNode;
}


const DashboardLayout = ({params, children} : DashboardLayoutProps) => {
    let username: string| null;
    useEffect(() => {
        username = localStorage.getItem("username");
        if(username !== params.username){
            redirect("/");
        }
    }, []);

    return(
        <>
            <DashboardNavbar/>
            <div className="flex"> {/*TODO ))*/}
                <Sidebar/>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
}
export default DashboardLayout;