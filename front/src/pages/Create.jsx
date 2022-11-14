import FormPost from "../components/FormPost";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn } from "../utils/lib";

const Create = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if(!isLoggedIn()) {
			navigate('/login');
		}
	}, [navigate]);
	return <FormPost></FormPost>;
};

export default Create;
