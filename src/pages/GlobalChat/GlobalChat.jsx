import UserCount from "../../components/UserData/UserCount";
import GlobalChatBox from "../../components/Chat/GlobalChatBox";

const GlobalChat = () => {
  return (
    <div className="max-h-screen w-full overflow-hidden pb-1">
      <div className="relative top-20 md:top-24 bg-gray-500/60 backdrop-blur-lg p-2 md:pr-8 text-right">
        <UserCount />
      </div>
      <GlobalChatBox />
    </div>
  );
};

export default GlobalChat;
