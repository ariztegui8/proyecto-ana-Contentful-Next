import { useRouter } from 'next/navigation';
import useProduct from '../hooks/useProduct';

const Product = () => {

  const router = useRouter();

  const { results} = useProduct()

  const handleCardClick = (id) => {
    router.push(`/product/${id}`);
  };

  const handleButtonClick = (e, id) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* <div className='flex justify-center w-full pt-5'>
        <div className="input-group  max-w-xl ">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered w-full focus:outline-none  focus:none"
            onChange={handleChangeSearch}
          />
          <button className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
        {results.map((data) => (
          <div
            key={data.sys.id}
            className="card bg-base-100 flex items-center justify-center gap-4 w-full "
          >
            <div className="flex justify-center flex-1">
              <div className="card w-80 bg-base-100 border-2 border-[#ECEDFD]">
                {/* <figure>
                  <img
                    className="w-full h-40 object-contain sm:h-52"
                    src={data.fields.image.fields.file.url}
                    alt={data.fields.title}
                  />
                </figure> */}
                <div
                  onClick={() => handleCardClick(data.sys.id)}
                  className="card-body p-4 md:p-8 hover:bg-gray-50 cursor-pointer"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {data.fields.title}
                  </h2>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis mb-4">{data.fields.description}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleButtonClick(e, data.sys.id)}
                    >
                      {data.fields.button}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>

  );
};

export default Product;
