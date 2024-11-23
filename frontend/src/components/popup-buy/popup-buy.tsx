import { useEffect, useState } from 'react';
import { Workout } from '../../types/workout.type';
import { PaymentType } from '../../types/payment-type.enum';
import { useAppDispatch } from '../../store/hooks';
import { addOrder, addToBalance } from '../../store/api-actions';
import { PurchaseType } from '../../types/purchase-type.enum';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const';

type PopupBuyProps = {
  onPopupClose: () => void;
  workout: Workout;
}

function PopupBuy({onPopupClose, workout}: PopupBuyProps):JSX.Element {
  const {imageUrl, name, price, id} = workout;

  const [count, setCount] = useState<number>(1);
  const [payment, setPayment] = useState<PaymentType>(PaymentType.Visa);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onEscapeBtnClick = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      onPopupClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onEscapeBtnClick)
    return () => {
      document.removeEventListener('keydown', onEscapeBtnClick);
    }
  }, []);

  const handleAddWorkout = () => {
    setCount(count + 1);
  }
  const handleDeleteWorkout = () => {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  }
  const handlePaymentChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(evt.target.value as PaymentType);
  }

  const handleBuyButton = () => {
    if (count === 0 || count > 50) {
      toast.error('Количество тренировок должно быть от 1 до 50');
      return;
    }
    dispatch(addOrder({
      serviceId: id,
      orderType: PurchaseType.Subscription,
      count,
      price,
      payment
    })).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(addToBalance({ workoutId: id, count }));
        onPopupClose();
        navigate(`${AppRoutes.Workout}/${id}`);
      }
    });
  }

  return (
    <div className="popup-form popup-form--buy">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Купить тренировку</h2>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onPopupClose}>
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--purchases">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <source type="image/webp" srcSet={imageUrl} /><img src={imageUrl} srcSet={imageUrl} width="98" height="80" alt="" />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">{name}</h3>
                <p className="popup__product-price">{price} ₽</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <button className="btn-icon btn-icon--quantity" type="button" aria-label="minus" onClick={handleDeleteWorkout}>
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>
                  </button>
                  <div className="input-quantity__input">
                    <label>
                      <input type="text" value={count} size={2}  />
                    </label>
                  </div>
                  <button className="btn-icon btn-icon--quantity" type="button" aria-label="plus" onClick={handleAddWorkout}>
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <section className="payment-method">
              <h4 className="payment-method__title">Выберите способ оплаты</h4>
              <ul className="payment-method__list">
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input type="radio" name="payment-purchases" aria-label={PaymentType.Visa} value={PaymentType.Visa} checked={payment === PaymentType.Visa} onChange={handlePaymentChange} /><span className="btn-radio-image__image">
                        <svg width="58" height="20" aria-hidden="true">
                          <use xlinkHref="#visa-logo"></use>
                        </svg></span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input type="radio" name="payment-purchases" aria-label={PaymentType.Mir} value={PaymentType.Mir} checked={payment === PaymentType.Mir} onChange={handlePaymentChange} /><span className="btn-radio-image__image">
                        <svg width="66" height="20" aria-hidden="true">
                          <use xlinkHref="#mir-logo"></use>
                        </svg></span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input type="radio" name="payment-purchases" aria-label={PaymentType.Umoney} value={PaymentType.Umoney} checked={payment === PaymentType.Umoney} onChange={handlePaymentChange} /><span className="btn-radio-image__image">
                        <svg width="106" height="24" aria-hidden="true">
                          <use xlinkHref="#iomoney-logo"></use>
                        </svg></span>
                    </label>
                  </div>
                </li>
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                <use xlinkHref="#dash-line"></use>
              </svg>
              <p className="popup__total-price">{count * price}&nbsp;₽</p>
            </div>
            <div className="popup__button">
              <button className="btn" type="button" onClick={handleBuyButton}>Купить</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupBuy;
