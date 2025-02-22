function Footer() {
    const socials = ["Facebook", "Instagram", "Twitter"];
    return (
        <footer className="footerContainer w-full justify-between bg-white flex pt-20 pb-20 pl-10">
            <div className="colFooter1 w-1/2">
                <h5 className="text-[#6e4ffe] text-s font-bold mb-5 ">
                    Want to play ?
                </h5>
                <h3 className="text-[#6e4ffe] text-5xl font-bold">
                    LET'S PLAY
                </h3>
                <pre className="mt-7">
                    Compellingly disintermediate emerging <br />
                    e-markets through client-centric services.
                    <br />
                    Dynamically mesh premium total linkage
                    <br />
                    with backward-compatible interfaces.
                </pre>

                <pre className="mt-5">
                    © Copyright 2025. All Right Reserved.
                </pre>
            </div>
            <div className="flex flex-col w-1/2">
                <div className="colFooter2 w-full max-w-xl mt-10 mr-10">
                    <div className="flex items-center border-b border-gray-400 py-2">
                        <input
                            type="email"
                            placeholder="Enter your email here..."
                            className="flex-1 bg-transparent outline-none text-lg px-2"
                        />
                        <button type="submit" className="ml-2">
                            <svg
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.8569 2C16.8569 1.17157 16.1854 0.5 15.3569 0.5L1.85693 0.499999C1.02851 0.499999 0.356934 1.17157 0.356934 2C0.356935 2.82843 1.02851 3.5 1.85693 3.5H13.8569V15.5C13.8569 16.3284 14.5285 17 15.3569 17C16.1854 17 16.8569 16.3284 16.8569 15.5L16.8569 2ZM3.41759 16.0607L16.4176 3.06066L14.2963 0.93934L1.29627 13.9393L3.41759 16.0607Z"
                                    fill="black"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-start text-black items-start text-s font-semibold mt-1">
                    {socials.map((social) => {
                        return <button className="mt-3">{social}</button>;
                    })}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
