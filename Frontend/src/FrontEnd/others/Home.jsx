import { carbidding, housebidding } from "../../assets/images";

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <img
          src={carbidding}
          alt="Car Bidding"
          style={{ width: '40%' }}
        />
        <img
          src={housebidding}
          alt="House Bidding"
          style={{ width: '40%' }}
        />
      </div>
      <h1 style={{ fontSize: '48px', color: 'purple', textAlign: 'center', fontStyle: 'italic' }}>
        This is the bidding website
      </h1>
    </div>
  );
}

export default Home;
