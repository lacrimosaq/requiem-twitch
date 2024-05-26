"use client"
import AuthForm from "./_components/AuthForm/AuthForm";
import { MainNavbar } from "./_components/MainNavbar/MainNavbar";
import { useState, useRef, useEffect } from 'react';

const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState("");
    const overlayOff = (e) => {
      if (e.currentTarget != e.target) return;
      setShowForm(false);
      setFormType("");
    }; 
    useEffect(() => {
        if(formType !== "") setShowForm(true);
        else setShowForm(false);
    }, [formType]);
    return(
        <>
        <MainNavbar setChildState={setFormType}/>
        <div>
            {children}
        </div>
        {showForm && (
            <div className="relative h-screen w-screen overflow-hidden ">
                <div onClick={overlayOff}  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  {/* <LoginForm stateChanger={undefined}/> */}
                <AuthForm form={formType}/>
                </div>
            </div>
            )}
        </>
    );
};
export default BrowseLayout;