import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="loading-container">
            <AiOutlineLoading3Quarters className="loading-icon rotating" />
        </div>
    );
}

export default Loading;