import React from "react";
import { useParams } from "react-router-dom";
import VarietyCard from "../../components/VarietyCard/VarietyCard";

const CropCategory = () => {
  const { cropId } = useParams();

  const cropVarieties = {
    1: [
      {
        id: 1,
        name: "Basmati",
        price: "₹2,500 per quintal",
        quantity: "300 quintals",
        image: "https://pushanta.com/public/uploads/product_21661226307.jpg",
      },
      {
        id: 2,
        name: "Sona Masoori",
        price: "₹1,800 per quintal",
        quantity: "500 quintals",
        image: "https://mouryaimpex.com/assets/img/products/sona-masuri.jpg",
      },
      {
        id: 3,
        name: "Jasmine Rice",
        price: "₹1,800 per quintal",
        quantity: "500 quintals",
        image: "https://static.vecteezy.com/system/resources/previews/003/115/104/non_2x/asian-rice-in-wooden-spoon-free-photo.jpg",
      },
    ],
    2: [
      {
        id: 1,
        name: "Hard Red Winter",
        price: "₹2,200 per quintal",
        quantity: "400 quintals",
        image: "https://img.freepik.com/free-photo/beautiful-red-plants-outdoors_23-2149435981.jpg?t=st=1726556582~exp=1726560182~hmac=59335318e56898afebd5adc2f304eb6bebd10ecd71acdfe83d910fac4181d41d&w=360",
      },
      {
        id: 2,
        name: "Durum Wheat",
        price: "₹2,000 per quintal",
        quantity: "350 quintals",
        image: "https://cdn.britannica.com/18/122518-050-A0740F9F/Field-durum-wheat.jpg",
      },
    ],
    3: [
        {
            id: 1,
            name: "Dent Corn",
            price: "₹3000 per quintal",
            quantity: "300 quintals",
            image: "https://5.imimg.com/data5/SELLER/Default/2022/1/KX/DU/KP/22362088/dent-corn.jpg"
        },
        {
            id: 2,
            name: "Flint Corn",
            price: "₹3500 per quintal",
            quantity: "300 quintals",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Corncobs.jpg"
        },
        {
            id: 3,
            name: "Sweet Corn",
            price: "₹3500 per quintal",
            quantity: "200 quintals",
            image: "https://img.freepik.com/free-photo/seeds-sweet-corn-wooden-table_1150-9483.jpg"
        },
    ]
  };
  const varieties = cropVarieties[cropId] || [];
  return(
    <section className="py-10 bg-gray-100">
        <div className="flex flex-col container mx-auto px-14">
            <h2 className="text-3xl font-bold mb-8 text-center">Varieties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    varieties.map((variety) => (
                        <VarietyCard key={variety.id} variety={variety}/>
                    ))
                }
            </div>
        </div>
    </section>
  )
};

export default CropCategory;
