import "./GamePageHeader.css";

import Link from "next/link";

export function GamePageHeader({ children, title }: { children?: React.ReactNode, title?: string }) {
    return (
        <div className="header-container">
            <div className="header-title flex flex-row justify-center items-center">
                <div className="header-back-link text-lg"><Link className="p-2" href="./">{"<--"}</Link></div>
                { title ? <h2 className="header-label grow pl-4 text-lg">{title}</h2> : null }
            </div>

            <div className="header-content">
                {children}
            </div>
        </div>
    );
}
