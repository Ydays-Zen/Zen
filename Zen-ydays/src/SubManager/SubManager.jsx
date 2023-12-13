import { followUser } from "../Subscription/Subscription"; 

const SubManager = {
  follow: (currentUserId, targetUserId) => {
    return followUser(currentUserId, targetUserId);
  },
};

export default SubManager;
