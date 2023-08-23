import PropTypes from 'prop-types';

const Pokeinfo = ({ data }) => {
  return (
    <>
      {!data ? (
        'Please Select your pokemon'
      ) : (
        <div className="grid gap-4 sm:flex mt-8">
          <div className="flex-[100] md:flex-[40] grid justify-center">
            <h1 className="font-bold">{data.name}</h1>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`}
              alt={data.name}
            />
          </div>
          <div className="flex-[50] md:flex-[30] grid h-[fit-content] md:justify-items-start">
            <h3 className="mb-2 font-bold">Pokemon Ability</h3>
            {data.abilities.map((item, index) => (
              <span key={index}>
                {index + 1}. {item.ability.name}
              </span>
            ))}
          </div>
          <div className="flex-[50] md:flex-[30]">
            {data.stats.map((item, index) => (
              <div className="flex gap-2 justify-center md:justify-start" key={index}>
                <h3 className="font-bold">{item.stat.name}</h3> : <p>{item.base_stat}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Pokeinfo;
Pokeinfo.propTypes = {
  data: PropTypes.object,
};
