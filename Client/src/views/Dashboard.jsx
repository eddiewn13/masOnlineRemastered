


export default function Dashboard() {
    const hide = () => {
        let code = document.getElementById("gameCode");
            if (code.style.display === "flex") {
            code.style.display = "none";
            } else {
            code.style.display = "flex";
            }
    };
    return (
       

            <div className="flex flex-col justify-center items-center gap-14 w-screen h-screen">
                <h1 className="text-[80px] font-bold"> Welcome to Mas Online!</h1>
                    <input 
                        type="button" 
                        onClick={hide}
                        className="text-[60px] font-bold bg-[#90EE90] px-14 py-8 rounded-3xl cursor-pointer hover:bg-[#73c073]"
                        value="Play"
                        />
            </div>
    )
}