import UserCount from "../../components/Sections/UserCount";
import GlobalChatBox from "../../components/Sections/GlobalChatBox";

const GlobalChat = () => {
  return (
    <div className="max-h-screen w-full overflow-hidden pb-1">
      <div className="relative top-20 md:top-24 bg-gray-500/30 backdrop-blur-lg pt-5 p-2 md:pr-8 md:pt-2 text-right">
        <UserCount />
      </div>
      <GlobalChatBox />
    </div>
  );
};

export default GlobalChat;
