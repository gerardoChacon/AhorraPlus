import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function PresupuestoScreen() {
  const [monto, setMonto] = useState("");
  const [lista, setLista] = useState([]);
  const [idEditando, setIdEditando] = useState(null);
  const [montoEditado, setMontoEditado] = useState("");

  const agregar = () => {
    if (!monto.trim()) return;
    setLista([...lista, { id: Date.now(), cantidad: monto }]);
    setMonto("");
  };

  const borrar = (id) => {
    setLista(lista.filter((item) => item.id !== id));
  };

  const iniciarEdicion = (item) => {
    setIdEditando(item.id);
    setMontoEditado(item.cantidad);
  };

  const guardarCambios = () => {
    setLista(
      lista.map((item) =>
        item.id === idEditando ? { ...item, cantidad: montoEditado } : item
      )
    );
    setIdEditando(null);
    setMontoEditado("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Presupuestos</Text>

        <Image
          source={require("../assets/logoAhorraMas.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitulo}>Agregar presupuesto</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej. 500"
          value={monto}
          onChangeText={setMonto}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botonAgregar} onPress={agregar}>
          <Text style={styles.textoBoton}>Agregar</Text>
        </TouchableOpacity>

        <Text style={styles.subtitulo}>Lista</Text>

        {lista.map((item) => (
          <View key={item.id} style={styles.item}>
            {idEditando === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={montoEditado}
                  onChangeText={setMontoEditado}
                  keyboardType="numeric"
                />

                <TouchableOpacity
                  style={styles.botonChico}
                  onPress={guardarCambios}
                >
                  <Text style={styles.textoChico}>Guardar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.textoItem}>${item.cantidad}</Text>

                <View style={styles.filaBotones}>
                  <TouchableOpacity
                    style={styles.botonChico}
                    onPress={() => iniciarEdicion(item)}
                  >
                    <Text style={styles.textoChico}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botonEliminar}
                    onPress={() => borrar(item.id)}
                  >
                    <Text style={styles.textoChico}>Borrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#f2f2f2", alignItems: "center" },

  header: {
    width: "100%",
    backgroundColor: "#1B4D1B",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  menuIcon: { color: "#fff", fontSize: 24 },
  title: { color: "#fff", fontSize: 20, fontWeight: "600" },
  logo: { width: 30, height: 30 },

  box: {
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },

  subtitulo: { fontSize: 16, fontWeight: "600", marginVertical: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  botonAgregar: {
    backgroundColor: "#1B4D1B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  textoBoton: { color: "#fff", fontWeight: "700" },

  item: {
    backgroundColor: "#eef5ee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoItem: { fontSize: 16, fontWeight: "600" },

  filaBotones: {
    flexDirection: "row",
    gap: 8,
  },

  botonChico: {
    backgroundColor: "#1B4D1B",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoChico: { color: "#fff", fontSize: 12 },

  botonEliminar: {
    backgroundColor: "#d11",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});
