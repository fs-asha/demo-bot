$(document).ready(function(){
	var startDate='';
	var endDate='';
	
	$('#startDate').datetimepicker({
		   pickTime:false,
		   format: "YYYY-MM-DD",
		   defaultDate: new Date()
		});
		
		$('#endDate').datetimepicker({
		   pickTime: false,
		   format: "YYYY-MM-DD",
		   defaultDate: new Date()
		});
	
	 $("#historySpinner").hide();
	$('#startDate').change(function(){
		$('#tableContainer').html('');
		if($('#startDate').val()>$('#endDate').val()){
			$("#conersation_history").attr("disabled",false);
			bootbox.alert({ 
						size: "small", 
						message: "Start date should be earlier to end date.", 
						callback: function(){	
						}
			});
		}
		
		
	
	});
	$('#endDate').change(function(){
	
		$('#tableContainer').html('');
		if($('#startDate').val()>$('#endDate').val()){
			$("#conersation_history").attr("disabled",false);
			bootbox.alert({ 
						size: "small", 
						message: "Start date should be earlier to end date.", 
						callback: function(){	
						}
			});
		}
		
	});
	
	$("#conersation_history").click(function(){
		
		 $("#historySpinner").show();
		$.ajax({
			url:'api/v1/getWrite2Us',
			method:'GET',
			data:{
				startDate:$('#startDate').val(),
				endDate:$('#endDate').val()
			},
			success:function(data){
				data=JSON.parse(data);
				var str='<table id="myTable" class="display"> '+
				'<thead>'+
					'<tr>'+
					'<th>Conversation ID</th>'+
					'<th>Name</th>'+
					'<th>Query</th>'+
					'<th>Timestamp</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody>';
				for(var i=0;i<data.length;i++){
					str+='<tr>'+
						'<td>'+data[i].conv_id+'</td>'+
						'<td>'+data[i].name+'</td>'+
						'<td>'+data[i].query+'</td>'+
						'<td>'+data[i].timestamp+'</td></tr>';
				}
				str+='</tbody></table>';
				$('.tableContainer').html(str);
				 $("#historySpinner").hide();
				 $("#PDFExportId").show();
				 $("#ExcelExportId").show();
				 $('#myTable').DataTable({"bLengthChange": false});
				 $('#myTable_filter input').css({'margin-bottom':'10px','border': '1px solid #000','padding': '3px','font-size': '15px'});
			},
			fail:function(xhr){
				
			}
		});
		
		
	});
	
	
});