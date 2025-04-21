export default function CenteredDiv({ children }) {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br">
            {children}
        </div>
    );
}
