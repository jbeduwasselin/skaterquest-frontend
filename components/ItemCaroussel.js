import {
  Animated,
  Dimensions,
  StyleSheet,
  useAnimatedValue,
} from "react-native";

export function ItemCaroussel({
  data,
  renderItem,
  itemWidth = 360,
  itemHeight = 360,
  containerStyle,
  sideSpace,
}) {
  const scrollX = useAnimatedValue(0); // Pour le carrousel des photos (X car scroll horizontal)
  const { width } = Dimensions.get("window"); // Pour l'affichage responsive
  const paddingHorizontal = sideSpace ?? (width - itemWidth) / 2; // Espacement entre les images du carrousel pour entre‑voir les images voisines à celle du milieu
  return (
    <Animated.FlatList // FlatList sert pour l'affichage des images en défilement et Animated pour la dynamisation
      {...{ data }} // Les photos
      pagingEnabled // Active le défilement "page par page" (possible de le désactiver en lui mettant ={false} mais mieux de l'activer pour l'affichage tablette d'après nos tests)
      horizontal // Scroll horizontal (par défaut FlatList est en scroll vertical)
      decelerationRate="fast" // Rend le scroll plus "snappy" (rapide) à s’arrêter
      showsHorizontalScrollIndicator={false} // Cache la barre de scroll horizontale
      snapToInterval={itemWidth} // Fluidifie le défilement en snappant automatiquement chaque image quand on scrolle
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }], // Lie le scroll horizontal à scrollX pour pouvoir animer en fonction de la position
        { useNativeDriver: true } // Rend l’animation exécutable directement par le moteur natif du téléphone (donc + fluide, + rapide et ne bloque pas le reste de l’UI)
      )}
      contentContainerStyle={{ paddingHorizontal, maxHeight: itemHeight }} // Gère l'espacement entre les images
      // Fonction renderItem() pour afficher les images (items) de la FlatList
      renderItem={(data) => {
        const inputRange = [
          (data.index - 1) * itemWidth,
          data.index * itemWidth,
          (data.index + 1) * itemWidth,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1, 0.8], // Règle la taille respective de l'image de gauche, du milieu et de droite
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6], // Règle l'opacité respective de l'image de gauche, du milieu et de droite
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={{
              transform: [{ scale }],
              opacity,
              ...styles.itemContainer,
              ...containerStyle,
            }}
          >
            {renderItem(data)}
          </Animated.View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: { borderRadius: 12, overflow: "hidden" },
});
