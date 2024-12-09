 
import {Loading} from 'react-daisyui';

export default function LoadingMessage() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-black text-white">
      <div className="flex justify-center">
        <Loading className="mr-2" /> Fetching data
      </div>
    </div>
  );
}
