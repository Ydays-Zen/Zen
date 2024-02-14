import  Subscription  from "./Subscription.jsx";

const SubManager = {
  follow: (currentdisplayName, targetdisplayName) => {
    const sub = new Subscription(currentdisplayName);
    return sub.followUser(targetdisplayName);
  },
};

export default SubManager;