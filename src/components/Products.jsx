const submit = async (e) => {
  e.preventDefault();

  const fd = new FormData();

  fd.append("name", form.name);
  fd.append("price", form.price);

  form.images.forEach((img) => {
    fd.append("images", img);
  });

  if (editId) {
    await api.patch(`/products/update/${editId}`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    await api.post("/products", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  setForm({
    name: "",
    price: "",
    images: [],
  });

  setEditId(null);
  load();
};