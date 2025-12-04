-- ============================================
--   CREACIÓN DE TABLAS PARA EL SISTEMA DE PEDIDOS
-- ============================================

-- TABLA CLIENTE
CREATE TABLE clientes (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(30),
    direccion VARCHAR(80)
);

-- TABLA CATEGORIA
CREATE TABLE categorias (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

-- TABLA PRODUCTO
CREATE TABLE productos (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    idCategoria INT NOT NULL,
    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria)
);

-- TABLA PEDIDO
CREATE TABLE pedidos (
    idPedido INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    idCliente INT NOT NULL,
    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (idCliente) REFERENCES clientes(idCliente)
);

-- TABLA DETALLE_PEDIDO
CREATE TABLE detalle_pedido (
    idDetalle INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    
    CONSTRAINT fk_detalle_pedido
        FOREIGN KEY (idPedido) REFERENCES pedidos(idPedido)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
);