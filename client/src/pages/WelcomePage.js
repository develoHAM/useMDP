import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import useDefaultCheck from '../hook/useDefaultCheck';
import FileInputComponent from '../component/FileInputComponent';
import { requestFail } from '../component/etc/SweetModal';
import { validateUnspecifiedPlannerData } from '../utils/DataValidate';
import {
	_PageWrapper,
	_PageContainer,
	_Row,
	_StartButtonCol,
	_FileInputButtonCol,
	_ButtonRow,
	_LeftCol,
	_RightCol,
	_ButtonContainer,
	_Button,
	_Image,
	_Title,
	_Subtitle,
} from '../constant/css/styledComponents/__WelcomePage';

export default function WelcomePage() {
	// const isMobile = useMediaQuery({
	// 	query: '(max-width: 576px)',
	// });

	const { naviCookieCheck } = useDefaultCheck();

	const [readFile, setReadFile] = useState();
	const navi = useNavigate();

	useEffect(() => {
		if (readFile) {
			const data = JSON.parse(readFile);
			if (validateUnspecifiedPlannerData(data)) {
				navi('/plannerNoEdit', {
					state: {
						sourceData: data,
					},
				});
			} else {
				requestFail('플래너 불러오기', '데이터가 올바르지 않습니다');
			}
		}
	}, [readFile]);

	const handleNavigation = (e) => {
		if (naviCookieCheck(e)) {
			navi('/home');
		}
	};

	return (
		<_PageWrapper fluid>
			<_PageContainer fluid>
				<_Row xs={1} md={2}>
					<_LeftCol>
						<_Title>Security-first diagramming for teams.</_Title>
						<_Subtitle>
							Bring your storage to our online tool, or save locally with the desktop app.
						</_Subtitle>
						<_ButtonRow>
							<_StartButtonCol>
								<_Button onClick={(e) => handleNavigation(e)}>시작하기</_Button>
							</_StartButtonCol>
							<_FileInputButtonCol>
								<FileInputComponent setState={setReadFile}>
									<_Button>불러오기</_Button>
								</FileInputComponent>
							</_FileInputButtonCol>
						</_ButtonRow>
					</_LeftCol>
					<_RightCol>
						<_Image src='https://picsum.photos/600/400' rounded fluid />
					</_RightCol>
				</_Row>
			</_PageContainer>
		</_PageWrapper>
	);
}

// <_Row xs={1} lg={2}>
// 	<_LeftCol>
// 		<_TitleStack gap={3}>
// 			<_Title>Security-first diagramming for teams.</_Title>
// 			<_Subtitle>Bring your storage to our online tool, or save locally with the desktop app.</_Subtitle>
// 		</_TitleStack>
// 		<_ButtonStack
// 			direction={isMobile ? 'horizontal' : 'horizontal'}
// 			gap={5}
// 			className='justify-content-center justify-content-md-start'>
// 			<_Button onClick={(e) => handleNavigation(e)} size='lg'>
// 				시작하기
// 			</_Button>
// 			<FileInputComponent setState={setReadFile}>
// 				<_Button size='lg'>불러오기</_Button>
// 			</FileInputComponent>
// 		</_ButtonStack>
// 	</_LeftCol>
// 	<_RightCol>
// 		<_Image src='https://picsum.photos/600/400' rounded fluid></_Image>
// 	</_RightCol>
// </_Row>;
