import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "../App.css";
import { toFahrenheit } from "../api";

// const WEEK_DAYS = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

const Card = ({ data, dailyTemp, conditionNow, variant }) => {
  // const days = new Date().getDay();
  const currentDate = new Date();
  // const forecastDays = WEEK_DAYS.slice(days, WEEK_DAYS.length).concat(
  //   WEEK_DAYS.slice(0, days)
  // );
  const forecastDates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i + 1);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  });

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          bgcolor: variant,
          padding: "6px",
          borderRadius: "20px",
          marginTop: "5%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontWeight: "bold",
        }}>
        {conditionNow && (
          <div className="flex justify-around w-full">
            <div className="flex flex-col items-center">
              <div className="text-lg">Humidity</div>
              <div className="text-2xl">{data?.main?.humidity}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg">Feels like</div>
              <div className="text-2xl">
                {Math.round(toFahrenheit(data?.main?.feels_like))}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg">Wind</div>
              <div className="text-2xl">{`${Math.round(
                data?.wind?.speed
              )} km/h`}</div>
            </div>
          </div>
        )}

        {dailyTemp && (
          <div className="flex no-wrap justify-around w-full p-2">
            {data.list.splice(0, 5).map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div>{forecastDates[idx]}</div>
                <img
                  src={`icons/${item.weather[0].icon}.png`}
                  alt="day"
                  className="w-20"
                />
                <div>H:{Math.round(toFahrenheit(item?.main?.temp_max))}</div>
                <div>L:{Math.round(toFahrenheit(item?.main?.temp_min))}</div>
              </div>
            ))}
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Card;
