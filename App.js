import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";

let productos = [
  {
    nombre: "Cepillo Dental",
    categoria: "Salud Bucal",
    precioCompra: 0.83,
    precioVenta: 1.0,
    codigo: 100,
  },
  {
    nombre: "Protector Solar",
    categoria: "Salud Piel",
    precioCompra: 4.0,
    precioVenta: 4.8,
    codigo: 101,
  },
];

// esNuevo indica si se esta creando nuevo producto o se esta modificando un existente
let esNuevo = true;
// Almacena el indice del arrego del elemento seleccionado (edicion)
let indiceSeleccionado = -1;
// el input de precio venta no se podra editar
let boolInputPV = false;

export default function App() {
  const [txtCodigo, setTxtCodigo] = useState();
  const [txtNombre, setTxtNombre] = useState();
  const [txtCategoria, setTxtCategoria] = useState();
  const [txtPrecioC, setTxtPrecioC] = useState();
  // variable con valor del PV con valor definido string para placeholder
  const [txtPrecioV, setTxtPrecioV] = useState("PRECIO DE VENTA");
  const [numElementos, setNumElementos] = useState(productos.length);

  let ItemProducto = ({indice, producto}) => {
    return (
      <TouchableOpacity 
        onPress={() => {
          setTxtCodigo(convertirStringToInt(producto.codigo).toFixed(0));
          setTxtNombre(producto.nombre);
          setTxtCategoria(producto.categoria);
          setTxtPrecioC((convertirStringToFloat(producto.precioCompra)).toFixed(2));
          setTxtPrecioV((convertirStringToFloat(producto.precioVenta)).toFixed(2));
          esNuevo = false;
          indiceSeleccionado = indice;
      }}>
        <View style={styles.itemProducto}>
        <View style={styles.itemCodigo}>
          <Text style={styles.textoPrincipal}>{producto.codigo}</Text>
        </View>
        <View style={styles.itemContenido}>
          <Text style={styles.textoPrincipal}>{producto.nombre}</Text>
          <Text style={styles.textoSecundario}>{producto.categoria}</Text>
        </View>
        <View style={styles.itemCodigo}>
          <Text style={styles.itemPrecio}>{(convertirStringToFloat(producto.precioVenta)).toFixed(2)}</Text>
        </View>
        <View style={styles.itemBotones}>
          {/* <Button
            title=" E "
            color="limegreen"
            onPress={() => {
              setTxtCodigo(convertirStringToInt(producto.codigo).toFixed(0));
              setTxtNombre(producto.nombre);
              setTxtCategoria(producto.categoria);
              setTxtPrecioC((convertirStringToFloat(producto.precioCompra)).toFixed(2));
              setTxtPrecioV((convertirStringToFloat(producto.precioVenta)).toFixed(2));
              esNuevo = false;
              indiceSeleccionado = indice;
            }}
          /> */}
          <Button
            title=" X "
            color="orangered"
            onPress={() => {
              indiceSeleccionado = indice;
              productos.splice(indiceSeleccionado, 1);
              Alert.alert("INFO", "Producto eliminada correctamente");
              setNumElementos(productos.length);
            }}
          />
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  let convertirStringToFloat = (string) => {
    return parseFloat(string);
  };

  let convertirStringToInt = (string) => {
    return parseInt(string);
  };

  let limpiar = () => {
    setTxtCodigo(null);
    setTxtNombre(null);
    setTxtCategoria(null);
    setTxtPrecioC(null);
    setTxtPrecioV("PRECIO DE VENTA");
    esNuevo = true;
    indiceSeleccionado = -1;
  };

  let camposVacios = () => {
    if (txtCodigo && txtNombre && txtCategoria && txtPrecioC && txtPrecioV) {
      return false;
    } else {
      return true;
    }
  };

  let existeProducto = () => {
    for (const item of productos) {
      if (item.codigo == txtCodigo) {
        return true;
      }
    }
    return false;
  };

  let guardarProducto = () => {
    if (camposVacios()) {
      Alert.alert("INFO", "Ingresa valores en todos los campos");
    } else {
      if (esNuevo) {
        if (existeProducto()) {
          Alert.alert(
            "INFO",
            "Ya existe un producto con el código: " + txtCodigo
          );
        } else {
          let producto = {
            codigo: txtCodigo,
            nombre: txtNombre,
            categoria: txtCategoria,
            precioCompra: txtPrecioC,
            precioVenta: txtPrecioV,
          };
          productos.push(producto);
          Alert.alert("INFO", "Producto agregado correctamente");
        }
      } else {
        productos[indiceSeleccionado].nombre = txtNombre;
        productos[indiceSeleccionado].categoria = txtCategoria;
        productos[indiceSeleccionado].precioCompra = txtPrecioC;
        productos[indiceSeleccionado].precioVenta = convertirStringToFloat(txtPrecioV);
        Alert.alert("INFO", "Producto modificado correctamente");
      }
      limpiar();
      setNumElementos(productos.length);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.areaCabecera}>
        <Text style={styles.titulo}>PRODUCTOS</Text>
        <ScrollView>
          <TextInput
            style={styles.txt}
            value={txtCodigo}
            placeholder="CÓDIGO"
            onChangeText={setTxtCodigo}
            keyboardType="numeric"
            editable={esNuevo}
          />
          <TextInput
            style={styles.txt}
            value={txtNombre}
            placeholder="NOMBRE"
            onChangeText={setTxtNombre}
          />
          <TextInput
            style={styles.txt}
            value={txtCategoria}
            placeholder="CATEGORIA"
            onChangeText={setTxtCategoria}
          />
          <TextInput
            style={styles.txt}
            value={txtPrecioC}
            placeholder="PRECIO DE COMPRA"
            onChangeText={ txt => {
              setTxtPrecioC(txt);
              if (txt) {
                let precio_v = (convertirStringToFloat(txt) * 1.2).toFixed(2);
                setTxtPrecioV(precio_v);
              } else {
                setTxtPrecioV("PRECIO DE VENTA");
              }
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.txt}
            value={txtPrecioV}
            placeholder={String(txtPrecioV)}
            keyboardType="numeric"
            editable={boolInputPV}
          />
          <View style={styles.areaBotones}>
            <Button
              title="Nuevo"
              onPress={() => {
                limpiar();
              }}
            />
            <Button
              title="Guardar"
              onPress={() => {
                guardarProducto();
              }}
            />
            <Text style={styles.textoTamaño}>Productos: {numElementos}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.areaContenido}>
        <FlatList
          data={productos}
          renderItem={({index, item}) => {
            return <ItemProducto indice={index} producto={item} />;
          }}
          keyExtractor={ item => item.codigo }
        />
      </View>
      <View style={styles.areaPie}>
        <Text>Autor: Jhon Torres</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  // inicio estilos generales----------------------
  textoPrincipal: {
    fontSize: 17,
  },
  textoSecundario: {
    fontStyle: "italic",
    fontSize: 14,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  txt: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingTop: 3,
    paddingHorizontal: 5,
    marginVertical: 7,
  },
  // fin estilos generales----------------------
  // inicio estilos componente----------------------
  itemProducto: {
    backgroundColor: "lemonchiffon",
    marginBottom: 7,
    padding: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lime",
    justifyContent: "center",
    alignItems: "center",
  },
  itemCodigo: {
    // backgroundColor: "teal",
    flex: 1,
    margin: 5,
  },
  itemContenido: {
    paddingLeft: 5,
    // backgroundColor: "turquoise",
    flex: 3,
  },
  itemPrecio: {
    // backgroundColor: "teal",
    fontWeight: "bold",
    fontSize: 17,
  },
  itemBotones: {
    flex: 1.5,
    // backgroundColor: "teal",
    flexDirection: "row",
    // con boton editar
    // justifyContent: "space-between",
    // sin boton editar, con TouchableOpacity
    justifyContent: "space-evenly",
    marginHorizontal: 5,
  },
  // fin estilos componente----------------------
  // inicio areas----------------------
  areaCabecera: {
    flex: 7,
    // backgroundColor: "sandybrown",
    justifyContent: "center",
    marginVertical: 5,
  },
  areaContenido: {
    flex: 7,
    // backgroundColor: "thistle",
  },
  areaPie: {
    flex: 1,
    // backgroundColor: "steelblue",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  areaBotones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  // fin areas----------------------
});
