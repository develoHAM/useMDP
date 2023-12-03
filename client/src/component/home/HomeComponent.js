import CustomList from './customList/CustomList';
import MyLoadMap from '../LoadMap/MyLoadMap';
import copy from 'fast-copy';
import { getPlanners } from '../../utils/DataAxios';
import { useSelect } from '@mui/base';
import useDefaultCheck from '../../hook/useDefaultCheck';
import { HOME } from '../../constant/constant';
import { useSelector, useDispatch } from 'react-redux';
// Styled Components
import { _ComponentTitle } from '../../constant/css/styledComponents/__HomeComponent';

const statusIndexMap = {
	TODO: 0,
	DOING: 1,
	DONE: 2,
};

export default function HomeComponent() {
	//이미 저장된 값이 있으면 그 list를 불러온다.

	const plannerList = useSelector((state) => state.plannerList);
	const calendar = useSelector( state => state.calendar);
	useDefaultCheck(HOME);

	console.log("hom component calendar",calendar)
	console.log("home component",plannerList)

	// const [data, setData] = useState();

	// const dispatch = useDispatch();
	// console.log("local data",data);
	// useEffect(() => {
	//     async function fetchData() {
	//         const testData = [
	//             { plannerId: 1, creator: '123', title: '230303', likePlanner: 1, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cards: null, description: '123' },
	//             { plannerId: 2, creator: '234', title: '230304', likePlanner: 2, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cards: null, description: '123' },
	//             { plannerId: 3, creator: '456', title: '230305', likePlanner: 3, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cards: null, description: '123' },
	//         ];
	//         // const response = await axios.get('/api/myplanner');
	//         try {
	//             const response = await getPlanners();
	//             console.log('res : ', response.data);
	//             if (response.data.length == 0) {
	//                 setData(testData);

	//                 dispatch(plannerListActions.setPlannersInit(testData));
	//             } else {
	//                 const newData = response.data.data.map((item, idx) => {
	//                     const newItem = { ...item, cards: item.cards ? item.cards : [] };
	//                     return newItem;
	//                 });
	//                 setData(newData);
	//                 dispatch(plannerListActions.setPlannersInit(newData));
	//             }
	//         } catch {
	//             setData(testData);
	//             dispatch(plannerListActions.setPlannersInit(testData));
	//         }
	//     }
	//     fetchData();
	// }, [setData, dispatch]);

	return (
		<>
			<_ComponentTitle>MY PLANNERS</_ComponentTitle>
			<CustomList datas={plannerList} loadMap={MyLoadMap}></CustomList>
		</>
	);
}
