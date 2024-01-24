import { followUser } from '../Subscription/Subscription.jsx'; 

const SubManager = {
  follow: (currentUserId, targetUserId) => {
    return followUser(currentUserId, targetUserId);
  },
};

export default SubManager;
