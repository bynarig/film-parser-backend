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
					apikey: apiKey, s: title,
				}
			});

			res.send(response.data);
		} catch (error) {
			next(error);
		}
	}
}

export default new SearchController();