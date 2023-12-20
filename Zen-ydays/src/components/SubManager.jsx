import { followUser } from './firebase'; 

const SubManager = {
  follow: (currentUserId, targetUserId) => {
    return followUser(currentUserId, targetUserId);
  },
};

export default SubManager;
