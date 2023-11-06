import React from 'react'

function Navbar() {
    const style = {
        listStyleType: "none",
        margin: "0",
        padding: "10px",
        overflow: "hidden",
        display: "flex", flexDirection: "row"
    }
    const li = {
        paddingLeft: "2px"
    }
    return (
        <div >
            <nav >
                <ul style={style}>
                    <li style={li}>Home </li>
                    <li style={li}>Project</li>
                    <li style={li}>About </li>
                    <li style={li}>Contact </li>
                    <li style={li}>Mo.No </li>
                    <li style={li}>Email</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;
