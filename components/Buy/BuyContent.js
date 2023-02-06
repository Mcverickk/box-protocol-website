import BuyBox from "./BuyBox";

const BuyContent = ({ boxes }) => {
  return (
    <>
      {boxes.map((box) => {
        return <BuyBox box={box} key={box.boxName} />;
      })}
    </>
  );
};

export default BuyContent;
