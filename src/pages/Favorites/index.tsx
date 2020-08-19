import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import AsyncStogare from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import styles from "./styles";

const Favorites = () => {
	const [favorites, setFavorites] = useState([]);

	const loadFavorites = () => {
		AsyncStogare.getItem("favorites").then(response => {
			if (response) {
				const favoritedTeachers = JSON.parse(response);

				setFavorites(favoritedTeachers);
			}
		});
	};

	useFocusEffect(
		React.useCallback(() => {
			loadFavorites();
		}, [])
	);

	return (
		<View style={styles.container}>
			<PageHeader title="Meus proffys favoritos" />

			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
				}}
			>
				{favorites.map((teacher: Teacher) => {
					return <TeacherItem key={teacher.id} teacher={teacher} favorited />;
				})}
			</ScrollView>
		</View>
	);
};

export default Favorites;
