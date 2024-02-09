import React from 'react';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="wrapper">
            <div className="wrapper-content">
                <main className="wrapper-main">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;