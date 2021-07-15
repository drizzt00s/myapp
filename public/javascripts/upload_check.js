//验证上传文件格式
function checkFileType(file,format){
	var result = true;
	var filepath = $(file).val();
	if(filepath!=''){
		var extStart = filepath.lastIndexOf(".")+1;
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		if($.inArray(ext,format)=='-1'){
			result = false;
		}
	}
	return result;
}

function getMessage(format){
	var msg = '';
	var num = format.length;
	for(var i=0;i<num;i++){
		msg += format[i];
		if(i<(num-1)){
			msg += ', ';
		}
	}
	msg = 'Allowed file types: ' + msg+'.';
	return msg;
}


var newErrMsg = "Please use a PDF, JPG, PNG, DOC, DOCX, XLS, XLSX or TXT file.<br/>Maximum size 5M.";
var file_err_tip = "Please upload the related files of PO.";
var newFormat = ['PDF', 'JPG', 'PNG', 'DOC', 'DOCX', 'XLS', 'XLSX', 'TXT'];

function poFiles(file, id) {
	var fileSize = file.files[0].size;
	if (!checkFileType(file, newFormat)) {
		$("#po_file_err").html('<label id="entry_file-error" class="error" for="entry_file">' + fileMimeTypeError + '</lable>').show();
		$(file).val('');
		return false;
	} else if ((fileSize / 1024 / 1024) >= 5) {
		$("#po_file_err").html('<label id="entry_file-error" class="error" for="entry_file">' + size_error + '</lable>').show();
		$(file).val('');
		return false;
	} else {
		$("#po_file_err").html('<label id="entry_file-error" class="error" for="entry_file">' + file_err_tip + '</label>').hide();
	}
	var len = $("input[type='file']").length;

	if (len <= 6) {
		$(".re_btn_a_container").find('.re_btn_a').removeClass('disable');
		var oFile = $(file).val();

		var file_name = newGetFileName(oFile);
		if (file_name.length > 20) {
			var oFilesHeader = file_name.slice(0, 8);
			var oFilesFooter = file_name.slice(file_name.length - 8);
			file_name = oFilesHeader + '...' + oFilesFooter;
		}
		var packDem = '<div class="purchaseOrd-file-packLi" id="display' + id + '">' +
			'<p>' + file_name + '</p>' +
			'<em>' +
			'<i class="iconfont icon" onclick="del_file(' + id + ');">&#xf092;</i>' +
			'</em>' +
			'</div>';
		$("#purchaseOrd-file-pack").show().append(packDem);

		var newID = parseInt(id) + 1;
		var str = '<input type="file" class="input_file" onchange="poFiles(this,' + newID + ')" id="file' + newID + '" name="po_files[]">';
		$("#purchaseOrd-fileLoad .purchaseOrd-fileLoad-btn").append(str);
		if (len == 5) {
			//$('#purchaseOrd-fileLoad').hide();
			$('.purchaseOrd-fileLoad-btn-bg').show();
			$('.purchaseOrd-fileLoad-btn').addClass('disable');
		}
	} else {
		$('#purchaseOrd-fileLoad').hide();
	}
}


function del_file(id) {
	$("#display" + id).remove();
	$("#file" + id).remove();
	$('#purchaseOrd-fileLoad').show();
	$('.purchaseOrd-fileLoad-btn').removeClass('disable');
	$('.purchaseOrd-fileLoad-btn-bg').hide();
	var len = $("#purchaseOrd-file-pack").find('.purchaseOrd-file-packLi').length;
	var productLen = $('.all_pro').length;
	if (len <= 0 && productLen <= 0) {
		$(".re_btn_a_container").find('.re_btn_a').addClass('disable');
	}
}