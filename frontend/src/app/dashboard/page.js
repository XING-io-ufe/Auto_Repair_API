import Dashboard from "@/components/Dashboard";

export default function dashboardPage() {
  return (
    <>
      <Dashboard
        bonusRoute="/bonusScore"
        toHome="/"
        toProfile="/profile"
        toContact="/contact"
        toChangePhone="/changePhone"
        toBooking="/booking"
        toAddCar="/addCar"
        toNotification="/notification"
      />
    </>
  );
}
