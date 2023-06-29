import LogOutButton from "@/components/common/LogOutButton";
import { cookies } from "next/headers";
import Image from 'next/image';
import { redirect } from "next/navigation";
import OpenFilter from "@/components/orders/OpenFilter";
import OrderCard from "@/components/orders/OrderCard";

async function getOrders() {
  const token = cookies().get("payload-token")?.value
  console.log(token)

  if (!token) {
    redirect("/login")
  }

  const res = await fetch("https://adamdemian1-gmailcom-goldlux-payloadcms.payloadcms.app/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    },
    credentials: "include",
  }).then(res => res.json())

  return res
}

export default async function Orders() {

  const orders = await getOrders()

  // zatial placeholder
  let customers = [
    { id: 0, name: "Zakaznik 1", select: true },
    { id: 1, name: "Zakaznik 2", select: false },
    { id: 2, name: "Zakaznik 3", select: false },
    { id: 3, name: "Zakaznik 4", select: false },
  ]

  console.log(orders);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}. ${month}. ${year}`;
  }

  function formatHour(dateString: string) {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minutes}`;
  }

  return (
    <div>
      <div className="my-10 w-full relative">
        <OpenFilter current={0}/>
        <div className="flex justify-center items-center w-full">
          <h1 className="text-black/50 text-md font-bold">História</h1>
        </div>
      </div>
      <div className="px-3">

        <div className="flex flex-row justify-around">
          {customers.map(customer => (
            <button className="mx-1 flex flex-col" key={customer.id}>
              <Image
                className="self-center"
                src={"/customer" + (customer.select ? "_select" : "") + ".svg"}
                alt={customer.select ? "Selected Customer" : "Customer"}
                width="36"
                height="36"
              />
              <p className={`text-xs text-[${customer.select ? "#FF2D55" : "#575757"}]`}>{customer.name}</p>
            </button>
          ))}
        </div>

        <h1 className="mt-5 text-2xl font-bold">Od 8.6 do 16.6</h1>

        <div className="mt-5 mb-11">
          {orders.errors && orders.errors.map((error: any, index: number) => (
            <p key={index}>{error.message}</p>
          ))}


          {orders.docs && orders.docs.map((order: any, index: number) => (
            <div key={order.id}>
              <div>
                <h3 className="text-xl mt-1 pl-3">{formatHour(order.estimated_start)}</h3>
              </div>
              <OrderCard id={order.id} title={`Objednávka ${index + 1}`} date={formatDate(order.estimated_start)} status={`Stav: ${order.status}`}/>
            </div>
          ))}
        </div>
        <div className="fixed bottom-16">
          {/* @ts-expect-error Server Component */}
          <LogOutButton />
        </div>
      </div>
    </div>
  )
}