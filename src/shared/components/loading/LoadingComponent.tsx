

interface LoadingProps {
    title: string;
    messageLoading: string;
}


const LoadingComponent = ({ title, messageLoading }: LoadingProps) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 py-20">
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-primary"></div>

                <div className="absolute w-10 h-10 border-4 border-blue-100 rounded-full animate-spin border-b-primary"></div>

            </div>
            <div className="flex flex-col items-center">
                <span className="text-gray-700 font-semibold text-lg">
                    {title}
                </span>

                <span className="text-gray-400 text-sm">
                    {messageLoading}
                </span>
            </div>

        </div>
    );
};

export default LoadingComponent;