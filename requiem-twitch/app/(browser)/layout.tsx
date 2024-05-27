"use client"
import AuthForm from "./_components/AuthForm/AuthForm";
import { MainNavbar } from "./_components/MainNavbar/MainNavbar";
import { useState, useRef, useEffect, Suspense } from 'react';
import { Sidebar, SidebarSkeleton } from "./_components/Sidebar/sidebar";
import { Container } from "./_components/container";
import { useForm } from "@/store/use-form";

const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const {visible,
         type,
         onClose,
        } = useForm((state) => state);

    const overlayOff = (e) => {
      if (e.currentTarget != e.target) return;
      onClose();
    }; 

    // useEffect(() => {
    //     if(formType !== "") setShowForm(true);
    //     else setShowForm(false);
    // }, [type]);

    return(
        <>
        <MainNavbar/>
        <div>
            {/* <Suspense fallback={<SidebarSkeleton/>}> */}
            {/* <Suspense fallback={<div>haha</div>}> */}
                <Sidebar/>
            {/* </Suspense> */}
            <Container>
                {children}
            </Container>
        </div>
        {visible && (
            <div className="relative h-screen w-screen overflow-hidden ">
                <div onClick={overlayOff}  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  {/* <LoginForm stateChanger={undefined}/> */}
                <AuthForm form={type}/>
                </div>
            </div>
            )}
        </>
    );
};
export default BrowseLayout;