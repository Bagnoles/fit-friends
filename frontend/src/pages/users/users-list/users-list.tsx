import UserCard from '../../../components/user-card/user-card';
import { UserInfo } from '../../../types/user.type';

type UsersListProps = {
  users: UserInfo[];
}

function UsersList({users}: UsersListProps):JSX.Element {
  return (
    <div className="users-catalog">
      <ul className="users-catalog__list">
        {users.map((item) => <UserCard className='users-catalog__item' user={item} key={item.id} />)}
      </ul>
      <div className="show-more users-catalog__show-more">
        <button className="btn show-more__button show-more__button--more" type="button" disabled>Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </div>
  );
}

export default UsersList;
