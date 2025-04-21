export default function Button({ type = "", text="" }) {
    return (
        <button
            type={type}
            className="bg-violet-500 text-[23px] w-full h-[50px] 
                        sm:rounded-3xl text-white hover:bg-violet-400 active:bg-violet-400 transition-all"
        >
            {text}
        </button>
    );
}
