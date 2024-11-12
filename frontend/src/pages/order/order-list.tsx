import { CoachOrder } from '../../types/order.type';
import OrderItem from './order-item';

type OrderListProps = {
  orders: CoachOrder[];
}

function OrderList({orders}: OrderListProps):JSX.Element {
  return (
    <ul className="my-orders__list">
      {orders.map((item) => <OrderItem key={item.id} order={item} />)}
    </ul>
  );
}

export default OrderList;
