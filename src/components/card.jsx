import PropTypes from 'prop-types';

const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item, index) => {
          return (
            <div
              className="flex-none py-2 px-2 first:pl-6 last:pr-6"
              key={index}
              onClick={() => infoPokemon(item)}
            >
              <h2>{item.id}</h2>
              <img src={item.sprites.front_default} alt="" />
              <h2>{item.name}</h2>
            </div>
          );
        })
      )}
    </>
  );
};
export default Card;

Card.propTypes = {
  pokemon: PropTypes.array,
  loading: PropTypes.bool,
  infoPokemon: PropTypes.func,
};
