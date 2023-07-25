import { useRouter } from 'next/navigation';
import useProduct from '../hooks/useProduct';

const Product = () => {

  const router = useRouter();

  const { results} = useProduct()

  const handleCardClick = (id) => {
    router.push(`/product/${id}`);
  };

  // const handleButtonClick = (e, id) => {
  //   e.stopPropagation();
  // };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {results.map((data) => (
          <div
            key={data.sys.id}
            className="card bg-base-100 flex items-center justify-center gap-4 w-full "
          >
            <div className="flex justify-center flex-1 w-full">
              <div className="card w-full bg-base-100 border-2 border-[#ECEDFD]">
                <figure>
                  <img
                    className="w-full h-40 object-contain sm:h-52"
                    src={data.fields.image.fields.file.url}
                    alt={data.fields.title}
                  />
                </figure>
                <div
                  onClick={() => handleCardClick(data.sys.id)}
                  className="card-body p-4 md:p-8 hover:bg-gray-50 cursor-pointer"
                >
                  <h2 className="text-lg font-semibold mb-4">
                    {data.fields.title}
                  </h2>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis mb-4">{data.fields.description}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-active btn-neutral capitalize"
                      onClick={() => handleCardClick(data.sys.id)}
                      // onClick={(e) => handleButtonClick(e, data.sys.id)}
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
