import DiscountItem from './discount-item';

function DiscountList():JSX.Element {
  return (
    <ul className="special-offers__list">
      <DiscountItem isActive />
      <DiscountItem />
      <DiscountItem />
    </ul>
  );
}

export default DiscountList;
