import SellBox from "./SellBox";

const SellContent = ({ boxes }) => {
  return (
    <>
      {boxes.map((box) => {
        return <SellBox box={box} key={box.boxName} />;
      })}
    </>
  );
};

export default SellContent;
