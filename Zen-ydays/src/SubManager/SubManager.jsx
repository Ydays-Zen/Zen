import { followUser } from '../Subscription/Subsciption.jsx'; 

const SubManager = {
  follow: (currentUserId, targetUserId) => {
    return followUser(currentUserId, targetUserId);
  },
};

export default SubManager;
