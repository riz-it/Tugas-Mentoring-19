var nomorUrut = 1;

var customElement = $("<div>", {
  css: {
    border: "5px dashed",
    "font-size": "50px",
    "text-align": "center",
    padding: "50px",
  },
  class: "spinner-border spinner-border-lg text-primary",
  text: "",
});

var bahan = [];

var dataTableCetak;
var dataTableProduk;
var dataTableBahan;

function closeModal(modal) {
  $("#" + modal).modal("hide");
}

function showModal(modal) {
  $("#" + modal).modal("show");
}

function fetchProduk() {
  $.ajax({
    url: "https://rizal.doxxa.my.id/api/v2/products",
    method: "GET",
    beforeSend: function () {
      $.LoadingOverlay("show", {
        image: "",
        custom: customElement,
      });
    },
    success: function ({ data }) {
      $.LoadingOverlay("hide");
      dataTableProduk.clear();
      data.forEach((item) => {
        dataTableProduk.row.add([
          '<input type="hidden" value="' +
            item.product_id +
            '" />' +
            item.product_code,
          item.product_name,
          `<div class="text-center"><button
          type="button"
          class="btn checklist btn-outline-primary btn-icon-circle btn-icon-circle-sm"
        >
          <i class="fas fa-check"></i>
        </button></div>`,
        ]);
      });

      dataTableProduk.draw();
      showModal("modalProduk");
    },
    error: function (err) {
      $.LoadingOverlay("hide");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.responseJSON.message,
      });
    },
  });
}

function fetchBahan() {
  $.ajax({
    url:
      window.location.origin +
      window.location.pathname +
      "assets/dummy/bahan.json",
    method: "GET",
    beforeSend: function () {
      $.LoadingOverlay("show", {
        image: "",
        custom: customElement,
      });
    },
    success: function ({ data }) {
      $.LoadingOverlay("hide");
      dataTableBahan.clear();

      data.forEach((item) => {
        dataTableBahan.row.add([
          item.kode,
          item.nama,
          item.qty,
          `<div class="text-center"><button
          type="button"
          class="btn mx-auto checklist btn-outline-primary btn-icon-circle btn-icon-circle-sm"
        >
          <i class="fas fa-check"></i>
        </button></div>`,
        ]);
      });

      dataTableBahan.draw();
      showModal("modalBahan");
    },
    error: function (err) {
      $.LoadingOverlay("hide");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    },
  });
}

function hapus(button) {
  var row = button.parentNode.parentNode;
  var nomorUrutHapus = parseInt(row.cells[0].innerHTML, 10);

  for (let i = bahan.length - 1; i >= 0; i--) {
    if (bahan[i][0] === row.cells[1].innerHTML) {
      bahan.splice(i, 1);
    }
  }

  var rowBelow = row.parentNode.rows;
  for (let i = nomorUrutHapus; i < rowBelow.length; i++) {
    var nomorUrutBaru = parseInt(rowBelow[i].cells[0].innerHTML, 10) - 1;
    rowBelow[i].cells[0].innerHTML = nomorUrutBaru;
  }

  nomorUrut--;
  row.parentNode.removeChild(row);
}

function validateStock(input) {
  var v = input.value,
    vc = v.replace(/[^0-9]/, "");
  vc = v.replace(/[^0-9,]/, "");
  if (v == 0) [(input.value = 1)];
  if (v !== vc) [(input.value = vc)];
  var stock = parseInt(input.getAttribute("data-stock"));
  var qty = parseInt(input.value);
  if (qty > stock) {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Stock tidak cukup!",
    });

    input.value = stock;
  } else if (qty < 1) {
    input.value = 1;
  }

  bahan.map(function (item) {
    var kodeProduk = item[0];

    if (kodeProduk == input.getAttribute("data-kode")) {
      item[2] = input.value;
    }
  });
}

function validateCart(bahan) {
  var table = document.getElementById("tabel-list-bahan");
  for (var i = 1; i < table.rows.length; i++) {
    var namaBahanTabel = table.rows[i].cells[1].innerHTML;
    if (namaBahanTabel === bahan) {
      return true;
    }
  }
  return false;
}

$(document).ready(function () {
  dataTableProduk = $("#tabel-produk").DataTable({
    columnDefs: [
      {
        targets: 0,
        width: "10%",
      },
    ],
  });

  dataTableBahan = $("#tabel-bahan").DataTable({
    columnDefs: [
      {
        targets: 0,
        width: "10%",
      },
    ],
  });

  $(".validateQty").on("input", function () {
    var v = $(this).val(),
      vc = v.replace(/[^0-9]/, "");
    vc = v.replace(/[^0-9,]/, "");
    if (v == 0) [$(this).val(1)];
    if (v !== vc) [$(this).val(vc)];
  });

  dataTableCetak = $("#tabel-cetak").DataTable({});

  $("#to-cart").on("click", function () {
    if (
      $("#form-kode-bahan").val() == "" ||
      $("#form-nama-bahan").val() == "" ||
      $("#form-stock-bahan").val() == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih bahan terlebih dahulu!",
      });
      return;
    }

    if (validateCart($("#form-kode-bahan").val())) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bahan sudah ditambahkan!",
      });
      return;
    }
    var tbody = $("#tbody-list-bahan");
    var newRow = tbody[0].insertRow(-1);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.innerHTML = nomorUrut;
    cell2.innerHTML = $("#form-kode-bahan").val();
    cell3.innerHTML = $("#form-nama-bahan").val();
    cell4.innerHTML =
      '<input class="form-control" data-kode="' +
      $("#form-kode-bahan").val() +
      '" oninput="validateStock(this)" type="text" data-stock="' +
      $("#form-stock-bahan").val() +
      '" value="1" id="qty-' +
      nomorUrut +
      '">';
    cell5.innerHTML =
      "<button class='btn btn-danger btn-sm' onclick='hapus(this)'>Hapus</button>";

    bahan.push([
      $("#form-kode-bahan").val(),
      $("#form-nama-bahan").val(),
      $("#qty-" + nomorUrut).val(),
    ]);

    $("#form-kode-bahan").val("");
    $("#form-nama-bahan").val("");
    $("#form-stock-bahan").val("");

    nomorUrut++;
  });

  $("#pilih-bahan").on("click", function () {
    if ($("#form-kode-produk").val() == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih bahan terlebih dahulu!",
      });
    } else {
      fetchBahan();
    }
  });

  $("#tabel-produk").on("click", ".checklist", function () {
    $("#form-id-produk").val($(this).closest("tr").find("input").val());
    
    $("#tbody-list-bahan").empty();
    bahan = [];
    $.ajax({
      url:
        "https://rizal.doxxa.my.id/api/v2/ingredients/" +
        $(this).closest("tr").find("input").val(),
      method: "GET",
      beforeSend: function () {
        $.LoadingOverlay("show", {
          image: "",
          custom: customElement,
        });
      },
      success: function (res) {
        $.LoadingOverlay("hide");
        if (res.status == true) {
          res.data.forEach((item) => {
            var tbody = $("#tbody-list-bahan");
            var newRow = tbody[0].insertRow(-1);

            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);

            cell1.innerHTML = nomorUrut;
            cell2.innerHTML = item.kode;
            cell3.innerHTML = item.nama;
            cell4.innerHTML =
              '<input class="form-control" data-kode="' +
              item.kode +
              '" oninput="validateStock(this)" readonly type="text" data-stock="' +
              item.qty +
              '" value="' +
              item.qty +
              '" id="qty-' +
              nomorUrut +
              '">';
            cell5.innerHTML =
              "<button class='btn btn-danger btn-sm' onclick='hapus(this)'>Hapus</button>";

            bahan.push([item.kode, item.nama, $("#qty-" + nomorUrut).val()]);

            $("#form-kode-bahan").val("");
            $("#form-nama-bahan").val("");
            $("#form-stock-bahan").val("");

            nomorUrut++;
          });
        } else {
          toastr["info"](res.message);
        }
      },
      error: function (err) {
        $.LoadingOverlay("hide");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.responseJSON.message,
        });
      },
    });
    let row = $(this).closest("tr");
    let kode = row.find("td:eq(0)").text();
    let nama = row.find("td:eq(1)").text();
    $("#form-kode-produk").val(kode);
    $("#form-nama-produk").val(nama);

    closeModal("modalProduk");
  });

  $("#tabel-bahan").on("click", ".checklist", function () {
    let row = $(this).closest("tr");
    let kode = row.find("td:eq(0)").text();
    let stock = row.find("td:eq(2)").text();
    let nama = row.find("td:eq(1)").text();
    $("#form-kode-bahan").val(kode);
    $("#form-nama-bahan").val(nama);
    $("#form-stock-bahan").val(stock);

    closeModal("modalBahan");
  });

  $("#cetak-transaksi").on("click", function () {
    if (
      $("#form-kode-produk").val() == "" ||
      $("#form-nama-produk").val() == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih produk terlebih dahulu!",
      });
      return;
    }
    if ($("#form-qty-produk").val() == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Masukan kuantitas terlebih dahulu!",
      });
      return;
    }

    if ($("#tabel-list-bahan tr").length == 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tambahkan bahan terlebih dahulu!",
      });
      return;
    }
    dataTableCetak.clear().rows.add(bahan).draw();
    let payload = {
      product_id: $("#form-id-produk").val(),
      data: [],
    };

    payload.data = bahan.map((item) => ({
      kode: item[0],
      nama: item[1],
      qty: item[2],
    }));

    $.ajax({
      url: "https://rizal.doxxa.my.id/api/v2/ingredients/",
      method: "POST",
      data: payload,
      dataType: "JSON",
      beforeSend: function () {
        $.LoadingOverlay("show", {
          image: "",
          custom: customElement,
        });
      },
      success: function (res) {
        $.LoadingOverlay("hide");
        if (res.status == true) {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: res.message,
          }).then(() => {
            $("#kode-akhir").val($("#form-kode-produk").val());
            $("#nama-akhir").val($("#form-nama-produk").val());
            $("#qty-akhir").val($("#qty-produks").val());
            $("#form-kode-produk").val("");
            $("#form-nama-produk").val("");
            $("#form-qty-produk").val("");
            $("#tbody-list-bahan").empty();
            console.log($("#tbody-list-bahan").html());
            nomorUrut = 1;
            bahan = [];

            $("#bd-example-modal-xl").modal("show");
          });
        }
      },
      error: function (err) {
        $.LoadingOverlay("hide");
        toastr["info"](err.responseJSON.message);
      },
    });
  });
});
