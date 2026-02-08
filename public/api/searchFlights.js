export default async function handler(req, res) {
  const { from, to, date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await fetch("https://api.duffel.com/air/offer_requests", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DUFFEL_API_KEY}`,
        "Content-Type": "application/json",
        "Duffel-Version": "v1"
      },
      body: JSON.stringify({
        slices: [
          {
            origin: from,
            destination: to,
            departure_date: date
          }
        ],
        passengers: [{ type: "adult" }],
        cabin_class: "economy"
      })
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
      }
