import { UserInfo } from '../../types/user.type';
import FriendsItem from './friends-item';

type FriendsListProps = {
  data: UserInfo[];
}

function FriendsList({data}: FriendsListProps):JSX.Element {
  return (
    <ul className="friends-list__list">
      {data.map((item) => <FriendsItem data={item} key={item.id} />)}
    </ul>
  );
}

export default FriendsList;
