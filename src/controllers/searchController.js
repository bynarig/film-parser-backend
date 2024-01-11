import axios from "axios";
import "dotenv/config";

const apiKey = process.env.OMDBAPIKEY;

const apiUrl = `http://www.omdbapi.com/`;

class SearchController {

	async omdbSearchByTitle (req, res, next) {
		try {
			const title = req.params.title;
			const response = await axios.get(apiUrl, {
				params: {
					apikey: apiKey, t: title // Pass the movie title as a parameter
				}
			});

			res.send(response.data); // Return the data if needed
		} catch (error) {
			next(error); // Handle the error as per your requirement
		}
	}
}

export default new SearchController();