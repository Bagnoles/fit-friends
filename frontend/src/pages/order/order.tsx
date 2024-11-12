import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import OrderList from './order-list';
import { AppRoutes, DEFAULT_PAGE_LIMIT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getOrders } from '../../store/order/order-selectors';
import { useEffect } from 'react';
import { fetchCoachOrders } from '../../store/api-actions';

function Order():JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);
  console.log(orders);

  useEffect(() => {
    dispatch(fetchCoachOrders())
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header activePage="main" />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <button className="btn-flat btn-flat--underlined my-orders__back" type="button" onClick={() => navigate(AppRoutes.Profile)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button className="btn-filter-sort" type="button"><span>Сумме</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-up"></use>
                      </svg>
                    </button>
                    <button className="btn-filter-sort" type="button"><span>Количеству</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-down"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {orders.length === 0 ? 'У Вас пока нет заказов...' : <OrderList orders={orders} />}
              <div className="show-more my-orders__show-more">
                <button
                  className="btn show-more__button show-more__button--more"
                  type="button"
                  disabled={orders.length < DEFAULT_PAGE_LIMIT}
                >Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Order;
